import styles from './Loader.module.css'

export function Loader() {
  return <>
  <div className="w-[400px] h-[400px] flex justify-center items-center">
    <span className={styles.loader}></span>
  </div>
  </>
}