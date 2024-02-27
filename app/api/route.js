
export function GET() {
    return new Response(JSON.stringify({message: "Hello World! Welcome to VK Traders"}), {
        headers: {
            "content-type": "application/json",
        }
    });
}