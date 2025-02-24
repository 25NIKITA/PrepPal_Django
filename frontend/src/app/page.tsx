import Image from "next/image";

export default function Home() {
  return (
    <main className="relative min-h-screen text-white overflow-hidden">
      {/* Hero Section with Background Image */}
      <section className="relative flex flex-col items-center justify-center min-h-screen bg-white">
  <div className="relative z-10 text-center p-8 ">
    <h1
      className="text-[25vw] font-extrabold tracking-tight mb-6 bg-clip-text text-transparent"
      style={{
        backgroundImage: 'url(/th.jpeg)', // Use the background image inside the text
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed', // Parallax effect
        WebkitBackgroundClip: 'text', // For Chrome and Safari
        MozBackgroundClip: 'text', // For Firefox
      }}
    >
      PrepPal
    </h1>
    <p className="text-4xl text-gray-800 mb-8 max-w-2xl mx-auto font-light">
      Not a Date, But a <span className="font-bold text-pink-500">StudyMate!</span>
    </p>
    <div className="space-x-4">
      <a
        href="#signup"
        className="px-8 py-4 text-white bg-purple-700 rounded-full shadow-lg hover:bg-pink-700 transition transform hover:scale-105"
      >
        Get Started
      </a>
      <a
        href="#features"
        className="px-8 py-4 text-purple-800 bg-white bg-opacity-20 border border-purple-500 rounded-full shadow-lg hover:bg-white hover:bg-opacity-50 transition transform hover:scale-105"
      >
        Learn More
      </a>
    </div>
  </div>
</section>


      {/* Features Section */}

      <section id="features" className="py-20 bg-white text-center">
        <h2 className="text-5xl font-bold text-purple-800 mb-12">Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
          <div className="flex flex-col items-center p-6 bg-purple-100 rounded-lg shadow-lg transition transform hover:scale-105">
            <Image src="/feature1.png" alt="Seamless Video Calling" width={120} height={120} />
            <h3 className="text-3xl font-semibold mt-6 text-purple-700">Seamless Video Calling</h3>
            <p className="text-lg text-gray-600 mt-4">
              Connect face-to-face with your study partners instantly for interactive learning.
            </p>
          </div>
          <div className="flex flex-col items-center p-6 bg-purple-100 rounded-lg shadow-lg transition transform hover:scale-105">
            <Image src="/feature2.png" alt="Smart Matching" width={120} height={120} />
            <h3 className="text-3xl font-semibold mt-6 text-purple-700">Smart Matching</h3>
            <p className="text-lg text-gray-600 mt-4">
              Our algorithm connects you with like-minded individuals for a personalized study experience.
            </p>
          </div>
          <div className="flex flex-col items-center p-6 bg-purple-100 rounded-lg shadow-lg transition transform hover:scale-105">
            <Image src="/feature3.png" alt="Instant Chat & Connect" width={120} height={120} />
            <h3 className="text-3xl font-semibold mt-6 text-purple-700">Instant Chat & Connect</h3>
            <p className="text-lg text-gray-600 mt-4">
              Chat with study partners anytime, anywhere, and stay connected on the go.
            </p>
          </div>
        </div>
      </section>



      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 to-pink-500 text-white">
        <h2 className="text-5xl font-bold text-center text-white mb-12">What Our Users Say</h2>
        <div className="max-w-4xl mx-auto text-center">
          <blockquote className="text-2xl italic mb-8">
            "PrepPal completely transformed the way I study. I found the perfect study partner, and our video sessions are super effective!"
          </blockquote>
          <p className="text-lg">- Jane Doe, Medical Student</p>
        </div>
      </section>




      {/* Call to Action Section */}
      <section id="signup" className="py-20 bg-white text-center">
        <h2 className="text-5xl font-bold text-purple-800 mb-6">Ready to Get Started?</h2>
        <p className="text-lg text-gray-600 mb-8">
          Sign up now and start your journey with PrepPal today!
        </p>
        <a
          href="/signup"
          className="px-8 py-4 bg-purple-700 text-white rounded-full shadow-lg font-semibold hover:bg-pink-700 transition transform hover:scale-105"
        >
          Sign Up Now
        </a>
      </section>

      {/* Footer */}
      <footer className="py-8 text-center bg-purple-200">
        <p className="text-gray-700">&copy; 2024 PrepPal. All rights reserved.</p>
      </footer>
    </main>
  );
}
