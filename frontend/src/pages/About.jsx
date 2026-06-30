const About = () => {
    return (
        <div className="container py-5">

            <h1 className="text-center mb-4">About ShopVerse</h1>
            <p className="lead text-center">
                ShopVerse is a modern e-commerce platform developed using the MERN Stack.
                It provides a seamless shopping experience with secure authentication,
                product browsing, shopping cart management, and an easy checkout process.
            </p>

            <div className="row mt-5">
                <div className="col-md-4">
                    <h3>Our Mission</h3>
                    <p>
                        To make online shopping simple, fast, secure and enjoyable by
                        providing high-quality products at affordable prices.
                    </p>
                </div>

                <div className="col-md-4">
                    <h3>Why ShopVerse?</h3>
                    <ul>
                        <li>Secure Login System</li>
                        <li>Easy Product Search</li>
                        <li>Fast Checkout</li>
                        <li>Responsive Design</li>
                        <li>User Friendly Interface</li>
                    </ul>
                </div>

                <div className="col-md-4">
                    <h3>Technologies</h3>
                    <ul>
                        <li>React</li>
                        <li>Node.js</li>
                        <li>Express.js</li>
                        <li>MongoDB</li>
                        <li>Bootstrap</li>
                    </ul>
                </div>
            </div>

        </div>
    );
};

export default About;