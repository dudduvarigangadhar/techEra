import './index.css'

const CourseCard = props => {
  const {details} = props
  const {imageUrl, name, description} = details
  return (
    <div className="cardContainer">
      <img src={imageUrl} alt={name} className="imgCard" />
      <div>
        <h1 className="nameCard">{name}</h1>
        <p className="paraCard">{description}</p>
      </div>
    </div>
  )
}

export default CourseCard
