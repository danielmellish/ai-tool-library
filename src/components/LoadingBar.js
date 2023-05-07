import * as React from 'react'
import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'

export default function LinearDeterminate() {
  const [progress, setProgress] = React.useState(0)

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 100
        }
        const diff = 2
        return Math.min(oldProgress + diff, 99)
      });
    }, 1000)

    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <Box >
      <LinearProgress color='secondary' variant="determinate" value={progress} />
    </Box>
  );
}