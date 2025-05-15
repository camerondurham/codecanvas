/*
Copyright © 2022 NAME HERE <EMAIL ADDRESS>
*/
package cmd

import (
	"fmt"
	"os"
	"path/filepath"

	"github.com/runner-x/runner-x/cli/runner/client"
	coderunner "github.com/runner-x/runner-x/engine/coderunner/v2"
	v2 "github.com/runner-x/runner-x/server/api/v2"
	"github.com/spf13/cobra"
)

// runCmd represents the run command
var runCmd = &cobra.Command{
	Use:   "run",
	Short: "runs the supplied code loaded in from a file.",
	Run: func(cmd *cobra.Command, args []string) {
		//TODO: implement flag logic, implement source file args parsing
		argLen := len(args)
		if argLen < 1 {
			fmt.Println("No file specified for compilation; Please specify a file!")
			return
		} else if argLen > 1 {
			fmt.Println("Multiple file compilation not yet supported. Please only specify a single file for compilation.")
			return
		}

		url, err := rootCmd.PersistentFlags().GetString("url")
		if err != nil {
			panic(err)
		}

		timeout, err := cmd.Flags().GetInt("timeout")
		if err != nil {
			panic(err)
		}

		filename := args[0]
		ext := filepath.Ext(filename)
		var langCheck string
		if lang, found := coderunner.FileExtensionToLangMap[ext]; found {
			langCheck = lang.Name
		} else {
			fmt.Printf("unrecognized file type: %s", ext)
			return
		}

		source, err := os.ReadFile(filename)
		if err != nil {
			fmt.Printf("File not found: %s", filename)
			return
		}

		config := client.Config{
			BaseUrl: url,
			Timeout: timeout,
		}
		cmdClient := client.NewClientFromConfig(config)

		r := &v2.RunRequest{
			Source: string(source[:]),
			Lang:   langCheck,
		}

		resp, err := cmdClient.Run(r)
		if err != nil {
			fmt.Println(err)
		} else if resp.Error != "" {
			fmt.Println(resp.Error)
		} else {
			fmt.Printf("Stdout: %s\nStderr: %s\n", resp.Stdout, resp.Stderr)
		}
	},
}

func init() {
	rootCmd.AddCommand(runCmd)

	runCmd.Flags().IntP("timeout", "t", 5, "the timeout delay for each request. default 5 seconds")
}
