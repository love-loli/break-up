import * as React from 'react'
import { useLocation } from 'react-router-dom'
import { Paper } from '@mui/material'
import Button from '@mui/material/Button'
import { useToasts } from '../components/Toast'
import type { ScaleForm } from '../components/Scales/types'
import Nominal from '../components/Scales/NominalScale'
import Ordinal from '../components/Scales/OrdinalScale'

const Scale: React.FC = () => {
  const location = useLocation()
  const { form } = location.state as { form: ScaleForm }

  const [curPage, setCurPage] = React.useState<any>()
  const [pageNo, setPageNo] = React.useState(0)
  const toast = useToasts()

  React.useEffect(() => {
    setCurPage(form.content[pageNo])
  }, [form, pageNo])

  function Content() {
    switch (form.type) {
      case 'nominal':
        return <Nominal content={curPage}/>
      case 'ordinal':
        return <Ordinal content={curPage}/>
    }
  }

  function onPrev() {
    setPageNo(pageNo - 1)
  }

  function onNext() {
    setPageNo(pageNo + 1)
  }

  function onSubmit() {
    toast.success('success')
  }

  return (
    <>
      <Paper className="p-[16px] w-[80%] flex flex-col justify-center items-center">
         <Content />
        <footer className="mt-[20px] w-[80%] flex justify-around">
          <Button
            onClick={() => onPrev()}
            disabled={pageNo <= 0}
            variant="contained"
          >
            上一题
          </Button>
          {pageNo < form.content.length - 1
            ? (
            <Button onClick={() => onNext()} variant="contained">下一题</Button>
              )
            : (
            <Button onClick={() => onSubmit()} variant="contained">提交</Button>
              )}
        </footer>
      </Paper>
    </>
  )
}

export default Scale
