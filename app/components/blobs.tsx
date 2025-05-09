import React from 'react';

const BlobPattern = () => {
  return (
    <>
      <div
        className="absolute w-full h-full -z-10"
        style={{
          '--blob-size-1': '200px',
          '--blob-size-2': '150px',
          '--blob-size-3': '250px',
          '--blob-color-1': '#f38ba8', // gray-700
          '--blob-color-2': '#89b4fa', // gray-600
          '--blob-color-3': '#cba6f7', // gray-400
        } as any}
      >
        {/* Blob 1 */}
        <div
          className="absolute rounded-full"
          style={{
            width: 'var(--blob-size-1)',
            height: 'var(--blob-size-1)',
            backgroundColor: 'var(--blob-color-1)',
            top: '20%',
            left: '10%',
            filter: 'blur(100px)', // Add blur for the blob effect
            animation: 'moveBlob1 6s infinite alternate', // Add animation
          }}
        />

        {/* Blob 2 */}
        <div
          className="absolute rounded-full"
          style={{
            width: 'var(--blob-size-2)',
            height: 'var(--blob-size-2)',
            backgroundColor: 'var(--blob-color-2)',
            top: '50%',
            right: '20%',
            filter: 'blur(80px)',
            animation: 'moveBlob2 8s infinite alternate-reverse',
          }}
        />

        {/* Blob 3 */}
        <div
          className="absolute rounded-full"
          style={{
            width: 'var(--blob-size-3)',
            height: 'var(--blob-size-3)',
            backgroundColor: 'var(--blob-color-3)',
            bottom: '10%',
            left: '30%',
            filter: 'blur(120px)',
            animation: 'moveBlob3 7s infinite alternate',
          }}
        />
      </div>
      <style jsx global>{`
        @keyframes moveBlob1 {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(50px, 30px);
          }
        }
        @keyframes moveBlob2 {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(-40px, -20px);
          }
        }
        @keyframes moveBlob3 {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(30px, -50px);
          }
        }
      `}</style>
    </>
  );
};

export default BlobPattern;
