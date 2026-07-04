const LoadingSpinner = () => {
    return (
        <div
            className="d-flex flex-column justify-content-center align-items-center"
            style={{ minHeight: "50vh" }}
        >
            <div
                className="spinner-border text-success"
                style={{
                    width: "3rem",
                    height: "3rem"
                }}
                role="status"
            >
                <span className="visually-hidden">Loading...</span>
            </div>

            <p className="mt-3 text-muted fw-semibold">
                Loading...
            </p>
        </div>
    );
};

export default LoadingSpinner;