import {Component} from 'react'
import Loader from 'react-loader-spinner'
import './index.css'
import CourseCard from '../CourseCard'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'INPROGRESS',
}

class CourseItem extends Component {
  state = {courseData: [], apiStatus: apiStatusConstants.initial}

  componentDidMount() {
    this.renderEachCourse()
  }

  coursesItemLoading = () => (
    <div className="loaderContainer">
      <div data-testid="loader">
        <Loader type="ThreeDots" color="#00BFFF" height={50} width={50} />
      </div>
    </div>
  )

  coursesItemFailure = () => (
    <div>
      <div className="loaderContainer">
        <img
          src="https://assets.ccbp.in/frontend/react-js/tech-era/failure-img.png"
          alt="failure view"
          className="failureImg"
        />
        <h1>Oops! Something Went Wrong</h1>
        <p>We cannot seem to find the page you are looking for.</p>
        <button type="button">Retry</button>
      </div>
      )
    </div>
  )

  getCourseItemViews = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.getCourseItem()
      case apiStatusConstants.inProgress:
        return this.coursesItemLoading()
      case apiStatusConstants.failure:
        return this.coursesItemFailure()
      default:
        return null
    }
  }

  getCourseItem = () => {
    const {courseData} = this.state
    return (
      <div className="courseCardDiv">
        <CourseCard details={courseData} />
      </div>
    )
  }

  renderEachCourse = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})

    const {match} = this.props
    const {params} = match
    const {id} = params
    const formatedUrl = id.substring(1, id.length)
    console.log(formatedUrl)
    const url = `https://apis.ccbp.in/te/courses/${formatedUrl}`
    const options = {
      method: 'GET',
    }

    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      console.log(data)
      const courseDetails = data.course_details
      const updatedData = {
        id: courseDetails.id,
        description: courseDetails.description,
        imageUrl: courseDetails.image_url,
        name: courseDetails.name,
      }

      console.log(updatedData)
      this.setState({
        courseData: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  render() {
    const {courseData} = this.state
    return <div>{this.getCourseItemViews()}</div>
  }
}

export default CourseItem
