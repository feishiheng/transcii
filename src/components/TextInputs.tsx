import Copy from "@mui/icons-material/ContentCopy"
import { Button } from "@mui/material"
import IconButton from "@mui/material/IconButton"
import InputAdornment from "@mui/material/InputAdornment"
import Stack from "@mui/material/Stack"
import TextField from "@mui/material/TextField"
import Tooltip from "@mui/material/Tooltip"
import { makeStyles } from "@mui/styles"
import { invoke } from "@tauri-apps/api/tauri"
import { enqueueSnackbar } from "notistack"
import type * as React from "react"
import { useState } from "react"

const useStyles = makeStyles(() => ({
  input: {
    fontFamily: "Consolas",
  },
}))

interface TextInputProps {
  label: string
  value: string
  error: boolean
  helper: string
  onInput: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const onCopy = async (value: string) => {
  try {
    await navigator.clipboard.writeText(value)
    if (value.length !== 0) {
      enqueueSnackbar("复制成功(●'◡'●)", {
        variant: "success",
        autoHideDuration: 3000,
        anchorOrigin: { vertical: "top", horizontal: "center" },
      })
    } else {
      enqueueSnackbar("复制了，但什么都没复制( ´･･ )ﾉ(._.`)`)", {
        variant: "warning",
        autoHideDuration: 3000,
        anchorOrigin: { vertical: "top", horizontal: "center" },
      })
    }
  } catch (e) {
    enqueueSnackbar("啊噢，出错了( ′ 3`) sigh~` )", {
      variant: "error",
      autoHideDuration: 3000,
      anchorOrigin: { vertical: "top", horizontal: "center" },
    })
  }

  return
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  error,
  value,
  helper,
  onInput,
}) => {
  const classes = useStyles()

  const handleCopy = async () => {
    await onCopy(value)
  }

  return (
    <TextField
      label={label}
      variant="outlined"
      style={{ width: "100%" }}
      error={error}
      fullWidth={true}
      multiline={true}
      rows="3"
      onChange={onInput}
      helperText={helper}
      value={value}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <Tooltip title="ᓚᘏᗢ  复制">
              <IconButton onClick={handleCopy}>
                <Copy />
              </IconButton>
            </Tooltip>
          </InputAdornment>
        ),
        classes: {
          input: classes.input,
        },
      }}
    />
  )
}

export default function TextInputs() {
  const [stringInput, setStringInput] = useState("")
  const [asciiInput, setAsciiInput] = useState("")
  const [stringError, setStringError] = useState(false)
  const [asciiError, setAsciiError] = useState(false)
  const [stringHelper, setStringHelper] = useState(" ")
  const [asciiHelper, setAsciiHelper] = useState(" ")
  const [strLen, setStrLen] = useState(0)

  const setError = (b: boolean, s: string) => {
    setStringError(b)
    setAsciiError(b)
    setStringHelper(b ? s : " ")
    setAsciiHelper(b ? s : " ")
  }

  const handleStringInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const str = (event.target as HTMLInputElement).value
    setStringInput(str)
    invoke<string>("on_string_input_changed", { s: str })
      .then((v) => {
        setError(false, " ")
        setAsciiInput(v)
        setStrLen(str.length)
      })
      .catch((e: unknown) => {
        setStringError(true)
        setStringHelper(String(e))
        setAsciiInput("")
        setStrLen(0)
      })
  }

  const handleAsciiInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const str = event.target.value
    setAsciiInput(str)
    invoke<string>("on_ascii_input_changed", { s: str })
      .then((v) => {
        setStringInput(v)
        setError(false, " ")
      })
      .catch((e: unknown) => {
        setAsciiError(true)
        setAsciiHelper(String(e))
        setStringInput("")
        setStrLen(0)
      })
  }

  const numStr = String(stringInput.length)
  const handleCopy = async () => {
    await onCopy(`${numStr}.".".${asciiInput}`)
  }

  return (
    <div className="space-y-20 w-full">
      <TextInput
        label="String"
        value={stringInput}
        onInput={handleStringInput}
        error={stringError}
        helper={stringHelper}
      />
      <Stack>
        <TextInput
          label="Ascii"
          value={asciiInput}
          onInput={handleAsciiInput}
          error={asciiError}
          helper={asciiHelper}
        />
        <Tooltip title="ᓚᘏᗢ  将 '.' 号分隔的字符串长度连接在ASCII字符串前面并复制 ">
          <Button
            variant="contained"
            endIcon={<Copy />}
            onClick={handleCopy}
            className="background-gradient font-bold font-sans"
          >
            字符串长度: {strLen}
          </Button>
        </Tooltip>
      </Stack>
    </div>
  )
}
