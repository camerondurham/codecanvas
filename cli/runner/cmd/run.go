/*
Copyright © 2022 NAME HERE <EMAIL ADDRESS>
*/
package cmd

import (
	"fmt"
	"path/filepath"

	"github.com/runner-x/runner-x/cli/runner/client"
	v2 "github.com/runner-x/runner-x/engine/coderunner/v2"
	"github.com/spf13/cobra"
)

// runCmd represents the run command
var runCmd = &cobra.Command{
	Use:   "run",
	Short: "runs the supplied code loaded in from a file.",
	Run: func(cmd *cobra.Command, args []string) {
		argLen := len(args)
		if argLen < 1 {
			fmt.Println("No file specified for compilation; Please specify a file!")
			return
		} else if argLen > 1 {
			fmt.Println("Multiple file compilation not yet supported. Please only specify a single file for compilation.")
			return
		}
		sourceFile := args[0]

		url, err := rootCmd.PersistentFlags().GetString("url")
		if err != nil {
			panic(err)
		}
		timeout, err := rootCmd.PersistentFlags().GetInt("timeout")
		if err != nil {
			panic(err)
		}
		language, err := cmd.Flags().GetString("language")
		if err != nil {
			panic(err)
		}

		if language == "" {
			ext := filepath.Ext(sourceFile)
			if ext == "" {
			}

			if name, exists := v2.FileExtensionToLangMap[ext]; ext == "" || !exists {
				fmt.Println("Unable to determine source language implicitly; please set with the language flag or add a file extension.")
				return
			} else {
				language = name.Name
			}
		}

		config := client.Config{
			BaseUrl: url,
			Timeout: timeout,
		}
		cmdClient := client.NewClientFromConfig(config)

		resp, err := cmdClient.RunRequest(language, sourceFile)
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

	// runCmd.Flags().IntP("timeout", "t", 5, "the timeout delay for each request. default 5 seconds")
	runCmd.Flags().StringP("language", "l", "", "specifies a compilation language. to see supported languages, see the `langs` command.")
}
