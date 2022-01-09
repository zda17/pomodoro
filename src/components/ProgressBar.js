const ProgressBar = ({ progress }) => {
    return (
        <>
            <progress 
                id="file" 
                max="100"
                className="progress-bar w-full"
                value={progress}>
                {progress}
            </progress>
            {/* styling is in index.css for simplicity */}

            <canvas id="confetti"></canvas>
        </>
    )
}

export default ProgressBar
