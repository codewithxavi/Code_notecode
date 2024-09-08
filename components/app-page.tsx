"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { useSearchParams, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FaGithub, FaLinkedin, FaYoutube } from "react-icons/fa";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
  loading: () => <p className="text-center py-4">Loading editor...</p>,
});

const defaultHTMLCode = `<html>
  <head>
    <title>HTML Sample</title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <style type="text/css">
      h1 {
        color: #CA3A33;
      }
    </style>
    <script type="text/javascript">
      alert("I am a sample..., visit devChallenges.io for more projects");
    </script>
  </head>
  <body>
    <h1>Heading No.1</h1>
    <input disabled type="button" value="Click me" />
  </body>
</html>`;

const defaultCSSCode = `body {
  background-color: #f0f0f0;
}

h1 {
  color: #333;
}`;

const defaultJSCode = `function greet() {
  alert('Hello, world!');
}

greet();`;

export function AppPage() {
  const [code, setCode] = useState(defaultHTMLCode);
  const [language, setLanguage] = useState("html");
  const [theme, setTheme] = useState("light");
  const [isEditorReady, setIsEditorReady] = useState(false);
  const searchParams = useSearchParams();
  const pathname = usePathname();

  useEffect(() => {
    // Ensure Monaco is loaded in the browser environment
    if (typeof window !== "undefined") {
      import("@monaco-editor/react").then(() => {
        setIsEditorReady(true);
      });
    }

    // Check if the URL contains the code parameter
    const encodedCode = searchParams.get("code");
    if (encodedCode) {
      const decodedCode = decodeURIComponent(atob(encodedCode));
      setCode(decodedCode);
    }
  }, [searchParams]);

  const handleCodeChange = (value: string | undefined) => {
    setCode(value || "");
  };

  const handleLanguageChange = (value: string) => {
    setLanguage(value);
    switch (value) {
      case "css":
        setCode(defaultCSSCode);
        break;
      case "javascript":
        setCode(defaultJSCode);
        break;
      default:
        setCode(defaultHTMLCode);
    }
    setIsEditorReady(false);
    import("@monaco-editor/react").then(() => {
      setIsEditorReady(true);
    });
  };

  const handleEditorDidMount = () => {};

  const handleShare = () => {
    const encodedCode = btoa(encodeURIComponent(code));
    const shareUrl = `${window.location.origin}${pathname}?code=${encodedCode}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      alert("URL copied to clipboard!");
    });
  };

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-4 relative overflow-hidden bg-cover bg-center"
      style={{
        backgroundImage: "url(/code_notecode/Hero-Background-notecode.svg)",
      }}
    >
      {/* Decorative elements */}

      {/* Header */}
      <header className="w-full max-w-4xl mb-8 flex justify-center items-center">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-purple-700 rounded-full"></div>
          <Image
            src="/code_notecode/NoteCodeLogo.svg"
            alt="NoteCode Logo"
            width={150}
            height={150}
            priority
            style={{ width: "auto", height: "auto" }}
          />
        </div>
      </header>

      <h2 className="text-4xl font-bold text-center mb-2 text-[#121826]">
        Create & Share
      </h2>
      <h3 className="text-3xl font-semibold text-center mb-8 text-[#121826]">
        Your Code easily
      </h3>
      {/* Main content */}
      <main className="w-full max-w-4xl bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="p-8">
          <div className="rounded-lg p-4 m-4">
            {isEditorReady ? (
              <MonacoEditor
                height="350px" // Reduced height
                language={language}
                theme={theme === "dark" ? "vs-dark" : "light"}
                value={code}
                onChange={handleCodeChange}
                onMount={handleEditorDidMount}
                options={{
                  minimap: { enabled: true },
                  fontSize: 14,
                  lineNumbers: "on",
                  padding: {
                    top: 10,
                    bottom: 10,
                  },
                }}
              />
            ) : (
              <div className="h-[350px] flex items-center justify-center">
                {" "}
                {/* Reduced height */}
                <p className="text-gray-500">Loading editor...</p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-gray-100 p-4 flex flex-col md:flex-row justify-between items-center">
          <div className="flex space-x-2 mb-4 md:mb-0">
            <Select onValueChange={handleLanguageChange}>
              <SelectTrigger className="w-[120px] bg-[#CED6E1] text-[#364153] flex justify-between items-center">
                <SelectValue placeholder="HTML" className="flex-grow" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="html">HTML</SelectItem>
                <SelectItem value="css">CSS</SelectItem>
                <SelectItem value="javascript">JavaScript</SelectItem>
              </SelectContent>
            </Select>
            <Select value={theme} onValueChange={setTheme}>
              <SelectTrigger className="w-[120px] bg-[#CED6E1] text-[#364153] flex justify-between items-center">
                <SelectValue placeholder="Theme" className="flex-grow" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="light">Light</SelectItem>
                <SelectItem value="dark">Dark</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button
            onClick={handleShare}
            className="bg-[#406AFF] hover:bg-[#3355CC] text-[#FFFFFE] px-8 flex items-center space-x-2 rounded-full"
          >
            <Image
              src="/code_notecode/share.svg"
              alt="Share Icon"
              width={20}
              height={20}
            />
            <span>Share</span>
          </Button>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full  text-black py-4 mt-8">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          <p className="mb-2">
            Developed with ❤️ by{" "}
            <a href="https://twitter.com/codewithxavi" className="text-red-900">
              @codewithxavi
            </a>
          </p>
          <div className="flex space-x-4">
            <a
              href="https://github.com/codewithxavi"
              target="_blank"
              rel="noopener noreferrer"
              title="GitHub"
              className="transition-transform transform hover:scale-110"
            >
              <FaGithub className="w-6 h-6 text-black" />
            </a>
            <a
              href="https://www.linkedin.com/in/codewithxavi"
              target="_blank"
              rel="noopener noreferrer"
              title="LinkedIn"
              className="transition-transform transform hover:scale-110"
            >
              <FaLinkedin className="w-6 h-6 text-blue-600" />
            </a>
            <a
              href="https://www.youtube.com/@codewithxavi"
              target="_blank"
              rel="noopener noreferrer"
              title="YouTube"
              className="transition-transform transform hover:scale-110"
            >
              <FaYoutube className="w-6 h-6 text-red-600" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
