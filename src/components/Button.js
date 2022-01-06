import PropTypes from 'prop-types';

const Button = ({ text }) => {
    return (
        <button 
            className="btn bg-blue-500 text-white mt-12"
        >
            Add task +
        </button>
    )
}

Button.propTypes = {
    text: PropTypes.string,
    onClick: PropTypes.func,
}

export default Button
