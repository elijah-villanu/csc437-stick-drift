import '../styles.css'
import '../tokens.css'
import { Link } from 'react-router'

interface IForumItemProps {
    id: string;
    key: string;
    name: string;
    content: string;
    game: string;
    author: string
}

export function ForumItem(props: IForumItemProps) {
    return (
            <Link to={`/forums/${props.id}`}><b><u>{props.game}:</u></b> {props.name}</Link>
    )
}