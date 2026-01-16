
export default function Readme() {
    return (
        <div className="prose prose-invert max-w-none">
            <h1>Amazon Clone Project</h1>
            <p>
                This is a fully functional clone of the Amazon e-commerce website.
            </p>

            <h2>Features</h2>
            <ul>
                <li>User Authentication (Sign up, Log in)</li>
                <li>Product Listing</li>
                <li>Shopping Cart</li>
                <li>Checkout Process</li>
            </ul>

            <h2>Tech Stack</h2>
            <ul>
                <li>React.js</li>
                <li>Firebase</li>
                <li>Stripe API</li>
            </ul>

            <div className="bg-[#2d2d2d] p-4 rounded mt-4">
                <code className="text-green-400">git clone https://github.com/samar12-rad/Amazon-clone.git</code>
            </div>
        </div>
    );
}
