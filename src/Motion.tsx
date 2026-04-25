import React, { useState } from 'react'
import {motion} from "framer-motion";

function MotionTrial() {
  const [count, setCount] = useState<number>(0);

  return (
    <div style={styles.container}>
      <motion.h1
        key={count} // 값 변경 시 애니메이션 트리거
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1.2, opacity: 1 }}
        exit={{ scale: 0.5, opacity: 0 }}
        transition={{ duration: 0.3 }}
        style={styles.count}
      >
        {count}
      </motion.h1>

      <div style={styles.buttonGroup}>
        <motion.button 
          whileTap={{scale: 0.8}} // 클릭 순간
          whileHover={{scale : 1.1}} // 마우스 올릴 때
          onClick={() => setCount((prev) => prev - 1)}
        >
          -
        </motion.button>
        <motion.button 
          whileTap={{scale: 0.8}} // 클릭 순간
          whileHover={{scale : 1.1}} // 마우스 올릴 때
          onClick={() => setCount((prev) => prev + 1)}
        >
          +
        </motion.button>
      </div>
    </div>
  )

}

export default MotionTrial

const styles: { [key: string]: React.CSSProperties} = {
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  count: {
    fontSize: "4rem",
    marginBottom: "20px",
  },
  buttonGroup: {
    display: "flex",
    gap: "10px",
  },
}
