import "./H2.scss"

export const H2 = (props: {text: string}) => {
  return (
    <h2 className={'default-h2'}>{props.text}</h2>
  )
}
