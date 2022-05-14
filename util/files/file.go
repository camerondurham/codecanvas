package files

import (
	"fmt"
	"os"
)

func RemovePath(path string) {
	err := os.RemoveAll(path)
	if err != nil {
		fmt.Println("error cleaning up after runner test")
	}
}
