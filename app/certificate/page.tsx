"use client"

export default function CertificatePage() {

  return (

    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-10">

      <div className="bg-white shadow-2xl rounded-3xl p-16 border-8 border-orange-500 max-w-5xl w-full text-center">

        <h1 className="text-6xl font-bold text-teal-800">
          Certificate of Completion
        </h1>

        <p className="text-2xl text-gray-600 mt-8">
          This certificate is proudly awarded to
        </p>

        <h2 className="text-5xl font-bold text-orange-500 mt-8">
          Shree Deva
        </h2>

        <p className="text-2xl text-gray-700 mt-8">
          for successfully completing
        </p>

        <h3 className="text-4xl font-bold text-teal-700 mt-6">
          Java Basics Course 🚀
        </h3>

        <p className="text-xl text-gray-500 mt-10">
          Issued by Smart Learning
        </p>

        {/* BUTTON */}
        <button
          onClick={() => window.print()}
          className="mt-12 bg-orange-500 hover:bg-orange-600 text-white px-10 py-4 rounded-2xl text-2xl font-bold"
        >
          Download Certificate 📥
        </button>

        {/* SIGNATURES */}
        <div className="mt-16 flex justify-between items-center">

          <div>
            <p className="border-t-2 border-gray-500 pt-2 text-lg">
              Instructor Signature
            </p>
          </div>

          <div>
            <p className="border-t-2 border-gray-500 pt-2 text-lg">
              Director Signature
            </p>
          </div>

        </div>

      </div>

    </div>

  )

}