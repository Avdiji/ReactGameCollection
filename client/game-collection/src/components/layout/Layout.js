import classes from "./Layout.module.css";

/**
 * A Layout which wraps all other components and pages.
 * 
 * @param {Object} props - Properties of the Layout.
 * 
 * @returns {JSX.Element} The Layout.
 */
export default function Layout(props) {
    return (
        <div className={classes.layout}>
            <div>{props.children}</div>
        </div>
    );
}
