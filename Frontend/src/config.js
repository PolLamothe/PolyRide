const config = {
    url: import.meta.env.VITE_SERVER_URL+"/api",
    demoMode: import.meta.env.VITE_DEMO_MODE === "true",
};

export default config;
