// HomePage.tsx
import { FaPencilAlt, FaSpellCheck, FaSyncAlt } from "react-icons/fa";
import ai from "../assets/images/ai.png";
import { useSelector } from "react-redux";

const HomePage = () => {
  const accessToken = useSelector((state: any) => state.auth.accessToken);

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-20 px-6">
          <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
            {/* Text */}
            <div
              className="md:w-1/2 mb-10 md:mb-0 animate-fadeIn"
              style={{ animationDelay: "0.1s" }}
            >
              <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
                Elevate Your Writing with AI
              </h2>
              <p className="text-lg md:text-xl mb-8 text-blue-100">
                Unleash the power of artificial intelligence to perfect your
                grammar, eliminate spelling errors, and transform your writing
                style.
              </p>

              {accessToken && (
                <p className="font-semibold bg-white text-blue-700 px-4 py-2 rounded-md inline-block shadow">
                  Welcome back! You are logged in.
                </p>
              )}
            </div>

            {/* Image */}
            <div
              className="md:w-1/2 flex justify-center animate-fadeIn"
              style={{ animationDelay: "0.3s" }}
            >
              <img
                src={ai}
                alt="AI Writing"
                className="rounded-xl shadow-2xl w-3/4 hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 px-6 bg-gray-50">
          <div className="container mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16 text-gray-800">
              Powerful Features at Your Fingertips
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {[
                {
                  icon: <FaPencilAlt className="text-6xl text-blue-500" />,
                  title: "Smart Grammar Correction",
                  desc: "Our AI analyzes context to provide accurate grammar suggestions, helping you write with confidence.",
                },
                {
                  icon: <FaSpellCheck className="text-6xl text-green-500" />,
                  title: "Advanced Spell Checker",
                  desc: "Catch even the most elusive spelling errors with our comprehensive dictionary and context-aware spell check.",
                },
                {
                  icon: <FaSyncAlt className="text-6xl text-purple-500" />,
                  title: "Intelligent Rephrasing",
                  desc: "Transform your sentences for clarity and impact, tailored to your desired tone and style.",
                },
              ].map((f, idx) => (
                <div
                  key={idx}
                  className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transform hover:scale-105 transition duration-300"
                >
                  <div className="flex justify-center mb-6">{f.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
                    {f.title}
                  </h3>
                  <p className="text-gray-600 text-center">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
