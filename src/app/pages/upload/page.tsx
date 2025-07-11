'use client';

import Navbar from '@/components/ui/Navbar';
import React, { useEffect, useState } from 'react';
import { FaSpinner } from 'react-icons/fa';
import useAuthenticaton from '@/components/auth/useAuthentication';
import { useRouter } from 'next/navigation';
import UnauthorizedModal from '@/components/auth/statusModal';
import StatusModal from '@/components/auth/statusModal';

function UploadPage() {
  const [video, setVideo] = useState<File | null>(null);
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [caption, setCaption] = useState('');
  const [isMock, setIsMock] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [statusModalTitle, setStatusModalTitle] = useState('');
  const [uploadErrorMessage, setUploadErrorMessage] = useState('');
  const [showUploadErrorModal, setShowUploadErrorModal] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setShowModal(true);
    }
    setTimeout(
      () => {
        localStorage.removeItem('token');
        console.log('Token cleared from localStorage');
      },
      1000 * 60 * 15
    );
  }, []);

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('video/')) {
      setModalMessage('Please select a valid video file (MP4, MOV, AVI, etc.)');
      setShowModal(true);
      return;
    }

    if (file.size > 100 * 1024 * 1024) {
      // 100MB limit
      setModalMessage('File size too large (max 100MB)');
      setShowModal(true);
      return;
    }

    setVideo(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!video || !email || !userName) {
      setModalMessage('Please fill in all required fields');
      setShowErrorModal(true);
      setShowModal(true);
      return;
    }

    const formData = new FormData();
    formData.append('videoFile', video);
    formData.append('email', email);
    formData.append('userName', userName);
    formData.append('caption', caption);
    formData.append('Ismock', String(isMock));

    try {
      const token = localStorage.getItem('token');
      console.log('token:', token);

      if (!token) {
        setModalMessage('Session expired. Please log in again.');
        setShowErrorModal(true);
        setShowModal(true);
        return;
      }

      setIsUploading(true);

      const response = await fetch('http://localhost:3001/posts/create_post', {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const result = await response.json();

      if (!response.ok) {
        setUploadErrorMessage(
          result.message || 'Upload failed. Please try again later.'
        );
        setShowUploadErrorModal(true);
        return;
      }

      setStatusModalTitle('Upload Successful!');
      setModalMessage('Your reel has been uploaded successfully.');
      setShowSuccessModal(true);
    } catch (err: any) {
      setUploadErrorMessage(err.message || 'Unexpected error during upload.');
      setShowUploadErrorModal(true);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <>
      <Navbar />
      <UnauthorizedModal
        isVisible={showErrorModal}
        message="You are not authorized to access this page. Redirecting...."
        onClose={() => {
          setShowModal(false);
        }}
      />

      <StatusModal
        isVisible={showUploadErrorModal}
        onClose={() => setShowUploadErrorModal(false)}
        type="error"
        title="Upload Failed"
        message={uploadErrorMessage}
      />

      <StatusModal
        isVisible={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        type="success"
        title={statusModalTitle}
        message={modalMessage}
      />

      {!showErrorModal && (
        <div className="p-6 min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 flex items-center justify-center px-4 py-10">
          {/* Upload Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-white/10 backdrop-blur-lg shadow-2xl rounded-2xl p-8 w-full max-w-md border border-white/20 relative"
          >
            {isUploading && (
              <div className="absolute inset-0 bg-black/50 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                <FaSpinner className="animate-spin text-4xl text-blue-400" />
              </div>
            )}

            <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-400 to-purple-300 bg-clip-text text-transparent">
              Upload Your Reel
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-blue-200">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 w-full bg-white/5 border border-white/10 px-4 py-3 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-200">
                  Username *
                </label>
                <input
                  type="text"
                  required
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="mt-1 w-full bg-white/5 border border-white/10 px-4 py-3 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-200">
                  Caption
                </label>
                <textarea
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  className="mt-1 w-full bg-white/5 border border-white/10 px-4 py-3 rounded-lg text-white resize-none focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-blue-200">
                  Video File *
                </label>
                <div className="mt-1 border border-white/10 rounded-lg p-4 bg-white/5">
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleVideoChange}
                    className="w-full text-sm text-blue-200 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-500 transition"
                  />
                </div>
              </div>

              {previewUrl && (
                <div className="rounded-lg overflow-hidden border border-white/10">
                  <video
                    src={previewUrl}
                    controls
                    className="w-full aspect-video"
                  />
                </div>
              )}

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={isMock}
                  onChange={(e) => setIsMock(e.target.checked)}
                  id="ismock"
                  className="w-4 h-4 text-blue-600 bg-white/5 border-white/10 rounded focus:ring-blue-500"
                />
                <label htmlFor="ismock" className="text-sm text-blue-200">
                  Mock Post?
                </label>
              </div>

              <button
                type="submit"
                disabled={isUploading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-semibold hover:from-blue-500 hover:to-purple-500 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isUploading ? 'Uploading...' : 'Upload Reel'}
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

export default useAuthenticaton(UploadPage);
