import PropTypes from 'prop-types';

const Header = (props) => {
    return (
        <header>
            <h1 className="text-white text-3xl font-bold">{props.title}</h1>
        </header>
    )
}

Header.defaultProps = {
    title: "Task Tracker",
}

// leaving this here so I dont forget about this, usually use TypeScript...
// Header.propTypes = {
//     title: PropTypes.string.isRequired,
// }

export default Header
