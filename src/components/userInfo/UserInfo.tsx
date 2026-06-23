import styles from './UserInfo.module.css'
import ferrari from'./ferrari.png'
const UserInfo = () => {
    return (
        <div className={styles.userInfoContainer}>
            <img className={styles.avatar} src={ferrari} alt={'koranech'} />
            <span className={styles.username}>Koranech</span>
        </div>
    );
};

export default UserInfo;
