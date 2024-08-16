import TextInputs from "@/components/TextInputs"
import type { NextPage } from "next"
import Image from "next/image"
import { SnackbarProvider } from "notistack"

const Home: NextPage = () => {
  return (
    <SnackbarProvider>
      <div className="flex min-h-screen flex-col bg-white">
        <main className="flex flex-1 flex-col items-center justify-center py-1">
          <h1 className="text-7xl font-bold">
            <p className="text-gradient font-consolas italic">Transcii</p>
          </h1>

          <div className="mt-20 w-1/2 min-w-96">
            <TextInputs />
          </div>
        </main>

        <footer className="flex flex-1 flex-grow-0 items-center justify-center border-t border-gray-200 py-4">
          <div>
            <a
              href="https://tauri.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-grow items-center justify-center p-4"
            >
              Powered by{" "}
              <span className="ml-2 h-6">
                <Image
                  src="/tauri_logo_light.svg"
                  alt="Vercel Logo"
                  height={24}
                  width={78}
                />
              </span>
            </a>
          </div>
        </footer>
      </div>
    </SnackbarProvider>
  )
}

export default Home
