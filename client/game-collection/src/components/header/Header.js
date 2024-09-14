import classes from "./Header.module.css"

/**
 * @param {Object} props Properties of the Header.
 * @param {string} props.title The Title of the Header.
 * @returns {JSX.Element} The Header.
 */
export default function Header(props) {
    return (
        <h1 className={classes.header}>{props.title}</h1>
    )
}