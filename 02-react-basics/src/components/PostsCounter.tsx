type PostsCounterProps = {
    count: number
    myText: string
}

export const PostsCounter: React.FC<PostsCounterProps> = (props) => {
    console.log("props", props)
  return (
    <div>{props.myText} {props.count === 1 ? "Post" : "Posts"}: {props.count}</div>
  )
}

// interface PostsCounterProps {
//     count: number
//     myText: string
// }

// export const PostsCounter = ({count, myText}: PostsCounterProps) => {
//     console.log("props", count, myText)
//   return (
//     <div>{myText} Amount of posts {count}</div>
//   )
// }

