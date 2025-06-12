import '../styles.css'
import '../tokens.css'
import{Link} from 'react-router'

interface IForumItemProps {
    id: string;
    key: string;
    name: string;
    content: string;
}

export function ForumItem(props: IForumItemProps) {
    return (
        
        <Link to='/forums/temp'>{props.name}</Link>

    )
}