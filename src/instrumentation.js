export async function register() {
  if (
    process.env.NEXT_RUNTIME === "nodejs" &&
    process.env.NODE_ENV === "development"
  ) {
    const { mockServer } = await import("../tests/setup/mocks/node");
    mockServer.listen();
  }
}
