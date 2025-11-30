'use client';

import { useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { safetyService } from '@/lib/services/safetyService';
import type { DataUpload } from '@/lib/services/safetyService';

export default function AdminPage() {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('upload');
  const [uploads, setUploads] = useState<DataUpload[]>([]);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<string>('');
  const [images, setImages] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    checkAuth();
    fetchUploads();
    fetchImages();
  }, []);

  const checkAuth = async () => {
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        router.push('/login');
        return;
      }

      const { data: userData } = await supabase
        .from('users')
        .select('role')
        .eq('id', user.id)
        .single();

      if (!userData || userData.role !== 'admin') {
        router.push('/unauthorized');
        return;
      }

      setUser({ ...user, role: userData.role });
    } catch (error) {
      router.push('/login');
    } finally {
      setLoading(false);
    }
  };

  const fetchUploads = async () => {
    try {
      const { data } = await safetyService.getUploads();
      setUploads(data);
    } catch (error) {
      console.error('Failed to fetch uploads:', error);
    }
  };

  const fetchImages = async () => {
    try {
      const response = await fetch('/api/admin/images');
      const { data } = await response.json();
      setImages(data);
    } catch (error) {
      console.error('Failed to fetch images:', error);
    }
  };

  const handleLogout = async () => {
    try {
      const supabase = createClient();
      await supabase.auth.signOut();
      router.push('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadStatus('');

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('sourceUrl', 'https://example.com/data-source');

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setUploadStatus(`Success! Processed ${result.processedRows} of ${result.totalRows} rows.`);
        if (result.errors) {
          setUploadStatus(prev => prev + ` Errors: ${result.errors.slice(0, 3).join(', ')}`);
        }
        fetchUploads();
      } else {
        setUploadStatus('Upload failed: ' + result.error);
      }
    } catch (error) {
      setUploadStatus('Upload failed: ' + (error as Error).message);
    } finally {
      setUploading(false);
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadStatus('');

    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('type', 'state');

      const response = await fetch('/api/admin/images', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        setUploadStatus('Image uploaded successfully!');
        fetchImages();
      } else {
        setUploadStatus('Image upload failed: ' + result.error);
      }
    } catch (error) {
      setUploadStatus('Image upload failed: ' + (error as Error).message);
    } finally {
      setUploading(false);
    }
  };

  const handleExport = async (format: string) => {
    try {
      const response = await fetch(`/api/admin/export?format=${format}`);
      
      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `safety-data-${new Date().toISOString().split('T')[0]}.${format}`;
        a.click();
        window.URL.revokeObjectURL(url);
      } else {
        const error = await response.json();
        setUploadStatus('Export failed: ' + error.error);
      }
    } catch (error) {
      setUploadStatus('Export failed: ' + (error as Error).message);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-slate-600">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-slate-50">
      <header className="sticky top-0 z-40 backdrop-blur bg-white/70 border-b border-slate-200">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="inline-block h-8 w-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 shadow-sm" />
            <span className="text-xl font-semibold tracking-tight">Admin Panel</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-600">{user.email}</span>
            <button
              onClick={handleLogout}
              className="text-sm px-3 py-1 rounded-md border border-slate-300 text-slate-700 hover:bg-slate-50"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
          <p className="text-slate-600 mt-2">Manage safety data, uploads, and system settings.</p>
        </div>

        <div className="border-b border-slate-200">
          <nav className="-mb-px flex space-x-8">
            {['upload', 'images', 'data', 'export', 'settings'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-2 px-1 border-b-2 font-medium text-sm capitalize ${
                  activeTab === tab
                    ? 'border-emerald-500 text-emerald-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        <div className="mt-8">
          {activeTab === 'upload' && (
            <div className="space-y-6">
              <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-6 transition hover:shadow-lg hover:-translate-y-0.5">
                <h2 className="text-lg font-semibold mb-4">Upload Dataset</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      CSV File (Required headers: state_code, safety_percentage)
                    </label>
                    <input
                      type="file"
                      accept=".csv"
                      onChange={handleFileUpload}
                      disabled={uploading}
                      className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Data Source URL
                    </label>
                    <input
                      type="url"
                      placeholder="https://example.com/data-source"
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    />
                  </div>
                  {uploadStatus && (
                    <div className={`p-3 rounded-md text-sm ${
                      uploadStatus.includes('success') 
                        ? 'bg-green-50 text-green-700' 
                        : 'bg-red-50 text-red-700'
                    }`}>
                      {uploadStatus}
                    </div>
                  )}
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-6">
                <h3 className="text-base font-semibold mb-3">Upload History</h3>
                <div className="space-y-2">
                  {uploads.length === 0 ? (
                    <p className="text-slate-500 text-sm">No uploads yet.</p>
                  ) : (
                    uploads.map((upload) => (
                      <div key={upload.id} className="flex items-center justify-between p-3 border border-slate-200 rounded-md hover:border-emerald-600 hover:shadow-sm transition">
                        <div>
                          <div className="font-medium text-sm">{upload.filename}</div>
                          <div className="text-xs text-slate-500">
                            {upload.created_at ? new Date(upload.created_at).toLocaleDateString() : 'Unknown date'}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs px-2 py-1 rounded ${
                            upload.status === 'completed' 
                              ? 'bg-green-100 text-green-700'
                              : upload.status === 'failed'
                              ? 'bg-red-100 text-red-700'
                              : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {upload.status || 'pending'}
                          </span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'images' && (
            <div className="space-y-6">
              <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-6">
                <h2 className="text-lg font-semibold mb-4">Upload Images</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Image File (JPEG, PNG, WebP - Max 5MB)
                    </label>
                    <input
                      type="file"
                      accept="image/jpeg,image/png,image/webp"
                      onChange={handleImageUpload}
                      disabled={uploading}
                      className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100"
                    />
                  </div>
                  {uploadStatus && (
                    <div className={`p-3 rounded-md text-sm ${
                      uploadStatus.includes('success') 
                        ? 'bg-green-50 text-green-700' 
                        : 'bg-red-50 text-red-700'
                    }`}>
                      {uploadStatus}
                    </div>
                  )}
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-6">
                <h3 className="text-base font-semibold mb-3">Image Gallery</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {images.length === 0 ? (
                    <p className="text-slate-500 text-sm col-span-full">No images uploaded yet.</p>
                  ) : (
                    images.map((image, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={image.url}
                          alt={image.name}
                          className="w-full h-32 object-cover rounded-md border border-slate-200"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity rounded-md flex items-center justify-center">
                          <span className="text-white text-xs text-center px-2">{image.name}</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'data' && (
            <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Data Management</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Search State
                  </label>
                  <input
                    type="text"
                    placeholder="Search states..."
                    className="w-full rounded-lg border border-slate-300 px-3 py-2"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {['Crime Rate', 'Police per Capita', 'Road Safety', 'Healthcare Access', 'Emergency Response', 'Disaster Risk', 'Women Safety'].map((metric) => (
                    <div key={metric}>
                      <label className="block text-xs text-slate-600 mb-1">{metric}</label>
                      <input
                        type="number"
                        min={0}
                        max={100}
                        className="w-full rounded-lg border border-slate-300 px-3 py-2"
                        placeholder="%"
                      />
                    </div>
                  ))}
                </div>
                <div className="flex gap-3">
                  <button className="px-4 py-2 rounded-md bg-slate-900 text-white hover:bg-slate-700">
                    Save Changes
                  </button>
                  <button className="px-4 py-2 rounded-md border border-slate-300 text-slate-700 hover:bg-slate-50">
                    Reset
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'export' && (
            <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Export Data</h2>
              <div className="space-y-4">
                <p className="text-slate-600">Download safety data in various formats.</p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => handleExport('csv')}
                    className="px-4 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-700"
                  >
                    Export as CSV
                  </button>
                  <button
                    onClick={() => handleExport('json')}
                    className="px-4 py-2 rounded-md border border-slate-300 text-slate-700 hover:bg-slate-50"
                  >
                    Export as JSON
                  </button>
                  <button className="px-4 py-2 rounded-md border border-slate-300 text-slate-700 hover:bg-slate-50">
                    Export as PDF Report
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="rounded-xl border border-slate-200 bg-white shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Settings</h2>
              <div className="space-y-6">
                <div>
                  <h3 className="text-base font-medium mb-3">Data Sources</h3>
                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="Crime data source URL"
                      className="w-full rounded-lg border border-slate-300 px-3 py-2"
                    />
                    <input
                      type="text"
                      placeholder="Healthcare data source URL"
                      className="w-full rounded-lg border border-slate-300 px-3 py-2"
                    />
                  </div>
                </div>
                <div>
                  <h3 className="text-base font-medium mb-3">Notifications</h3>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">Email notifications for new uploads</span>
                  </label>
                </div>
                <button className="px-4 py-2 rounded-md bg-slate-900 text-white hover:bg-slate-700">
                  Save Settings
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="mt-8 flex justify-center">
          <Link
            href="/"
            className="text-sm text-emerald-600 hover:text-emerald-500"
          >
            ← Back to Home
          </Link>
        </div>
      </main>
    </div>
  );
}
