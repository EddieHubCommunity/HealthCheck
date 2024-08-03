export async function register() {
  if (
    process.env.NEXT_RUNTIME === "nodejs" &&
    process.env.NODE_ENV === "development"
  ) {
    const { mockServer } = await import("../tests/setup/mocks/node");

    mockServer.listen({
      onUnhandledRequest(request, print) {
        const url = new URL(request.url);
        const unmocked = [
          "googleapis.com",
          "gstatic.com",
          "api.flagsmith.com",
          "https://github.com/mona.png",
        ];
        if (unmocked.some((host) => url.hostname.includes(host))) {
          return;
        }

        // Print the regular MSW unhandled request warning otherwise.
        print.warning();
      },
    });
  }
}
