import React from 'react'
import { useSelector } from 'react-redux'
import styles from "../../../styles/projectPage.module.scss";
function InfoBanner() {
    const information = useSelector(state => state.ProjectReducer.projectInfo)
    const {projectName,description} = information
    return (
        <div className={styles.info_banner}>
        <h1>{projectName}</h1>
        <p><strong>Description</strong> {description}</p>
        </div>
    )
}

export default InfoBanner
