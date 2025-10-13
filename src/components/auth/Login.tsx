import React from "react";
import { Link } from "react-router-dom";
import Block from "../Block";

const Login: React.FC = () => {
    return (
        <div className="min-h-screen w-full font-['Plus_Jakarta_Sans'] tracking-tight flex">
            <div className="w-full hidden md:inline-block">
                <img
                    className="h-full object-cover"
                    src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/leftSideImage.png"
                    alt="FastPrompt Login"
                />
            </div>

            <div className="w-full flex flex-col items-center justify-center bg-gradient-to-b from-orange-50/30 to-white relative">
                {/* Block Component for Creative Use */}
                <div className="hidden sm:block">
                    <Block
                        position="absolute"
                        top="top-30"
                        left="left-12"
                        right="right-0"
                        height="h-35"
                        width="w-150"
                        lineDirection="center"
                        lineColor="stroke-orange-200"
                        lineCount={17}
                        strokeWidth={2}
                        borderColor="border-orange-200"
                        borderWidth="border-y"
                        borderStyle="dashed"
                        zIndex={1}
                    />
                </div>

                {/* Back Navigation */}
                <Link to="/" className="absolute top-6 left-6 text-slate-600 hover:text-orange-400 transition-colors z-10">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </Link>

                <form className="md:w-96 w-80 flex flex-col items-center justify-center p-8 relative z-10">
                    <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-4xl lg:text-5xl text-slate-800 font-['Plus_Jakarta_Sans'] tracking-tight font-semibold leading-tight text-center">
                        Welcome to <span className="text-orange-400">FastPrompt</span>
                    </h1>
                    <p className="text-sm xs:text-base sm:text-lg md:text-xl mt-6 sm:mt-8 text-slate-600 font-['Plus_Jakarta_Sans'] tracking-tight leading-relaxed text-center">
                        Sign in to transform your ideas into perfect UI designs
                    </p>

                    <button
                        type="button"
                        className="w-full mt-8 bg-orange-100 hover:bg-orange-200 flex items-center justify-center h-12 rounded-xl border border-orange-200 transition-all duration-200"
                    >
                        <span className="text-slate-700 font-medium mr-3">Continue with</span>
                        <img
                            src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/login/googleLogo.svg"
                            alt="Sign in with Google"
                        />
                    </button>

                    <div className="flex items-center gap-4 w-full my-6">
                        <div className="w-full h-px bg-orange-200"></div>
                        <p className="w-full text-nowrap text-sm text-slate-500">
                            or sign in with email
                        </p>
                        <div className="w-full h-px bg-orange-200"></div>
                    </div>

                    <div className="flex items-center w-full bg-white/80 backdrop-blur-sm border border-orange-200 h-12 rounded-xl overflow-hidden pl-4 gap-3 shadow-sm">
                        <svg
                            width="16"
                            height="11"
                            viewBox="0 0 16 11"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M0 .55.571 0H15.43l.57.55v9.9l-.571.55H.57L0 10.45zm1.143 1.138V9.9h13.714V1.69l-6.503 4.8h-.697zM13.749 1.1H2.25L8 5.356z"
                                fill="#EA580C"
                            />
                        </svg>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="bg-transparent text-slate-700 placeholder-slate-500 outline-none text-sm w-full h-full font-['Plus_Jakarta_Sans'] tracking-tight"
                            required
                        />
                    </div>

                    <div className="flex items-center mt-6 w-full bg-white/80 backdrop-blur-sm border border-orange-200 h-12 rounded-xl overflow-hidden pl-4 gap-3 shadow-sm">
                        <svg
                            width="13"
                            height="17"
                            viewBox="0 0 13 17"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                d="M13 8.5c0-.938-.729-1.7-1.625-1.7h-.812V4.25C10.563 1.907 8.74 0 6.5 0S2.438 1.907 2.438 4.25V6.8h-.813C.729 6.8 0 7.562 0 8.5v6.8c0 .938.729 1.7 1.625 1.7h9.75c.896 0 1.625-.762 1.625-1.7zM4.063 4.25c0-1.406 1.093-2.55 2.437-2.55s2.438 1.144 2.438 2.55V6.8H4.061z"
                                fill="#EA580C"
                            />
                        </svg>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            className="bg-transparent text-slate-700 placeholder-slate-500 outline-none text-sm w-full h-full font-['Plus_Jakarta_Sans'] tracking-tight"
                            required
                        />
                    </div>

                    <div className="w-full flex items-center justify-between mt-8 text-slate-600">
                        <div className="flex items-center gap-2">
                            <input className="h-4 w-4 text-orange-400 border-orange-200 rounded focus:ring-orange-500 focus:ring-2" type="checkbox" id="checkbox" />
                            <label className="text-sm font-['Plus_Jakarta_Sans'] tracking-tight" htmlFor="checkbox">
                                Remember me
                            </label>
                        </div>
                        <a className="text-sm underline hover:text-orange-400 transition-colors font-['Plus_Jakarta_Sans'] tracking-tight" href="#">
                            Forgot password?
                        </a>
                    </div>

                    <button
                        type="submit"
                        className="mt-8 w-full h-12 rounded-xl text-white bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 transition-all duration-200 font-['Plus_Jakarta_Sans'] tracking-tight font-medium shadow-lg hover:shadow-xl"
                    >
                        Sign In
                    </button>
                    <p className="text-slate-600 text-sm mt-6 font-['Plus_Jakarta_Sans'] tracking-tight">
                        Don't have an account?{" "}
                        <a className="text-orange-400 hover:text-orange-500 underline transition-colors font-medium" href="#">
                            Sign up
                        </a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;