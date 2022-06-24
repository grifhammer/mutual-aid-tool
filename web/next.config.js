module.exports = {
  async rewrites() {
    return [
      {
        source: "/api/:path",
        destination: "https://localhost:8000/:path*",
      },
    ];
  },
};
