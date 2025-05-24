import '../styles.css'
import '../tokens.css'

interface IForumItemProps {
    id: string;
    key: string;
    name: string;
    content: string;
}

export function ForumItem(props: IForumItemProps) {
    return (
        
        <a href='/forums/temp'>{props.name}</a>

    )
}