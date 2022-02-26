package main

import (
  "fmt"
  "os"
)

type args struct {
  nprocs string
  fsize string
  runcmd string
  runargs []string
}

func main() {
  if len(os.Args) > 1 {
    fmt.Printf("args: %v\n", os.Args)
    // TODO: parse into args
  }
}
