/*
Copyright © 2022 NAME HERE <EMAIL ADDRESS>
*/
package cmd

import (
	"fmt"
	"github.com/runner-x/runner-x/server/api/v1"
	"os"

	"github.com/runner-x/runner-x/cli/runner/client"
	coderunner "github.com/runner-x/runner-x/engine/coderunner/v1"
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
		str, err := cmd.Flags().GetString("lang")
		if err != nil {
			panic(err)
		}

		url, err := rootCmd.PersistentFlags().GetString("url")
		if err != nil {
			panic(err)
		}

		filename := args[0]
		ext := extractExtension(filename)
		var langCheck coderunner.Language
		if str == "implicit" {
			if lang, found := coderunner.ExtensionFileMap[ext]; found {
				langCheck = lang
			} else {
				fmt.Printf("unrecognized file type: %s", ext)
				return
			}
		}

		source, err := os.ReadFile(filename)
		if err != nil {
			fmt.Printf("File not found: %s", filename)
			return
		}

		// add a flag to modify timeout?
		var cmdClient client.Requester
		clint := client.Config{
			BaseUrl: url,
			Timeout: coderunner.TIMEOUT_DEFAULT,
		}
		cmdClient = client.NewClientFromConfig(clint)

		r := &v1.RunRequest{
			Source: string(source[:]),
			Lang:   langCheck,
		}

		resp, err := cmdClient.Run(r)
		if err != nil {
			fmt.Println(err)
		} else if resp.Error != nil {
			fmt.Println(resp.Error)
		} else {
			fmt.Printf("Stdout: %s\nStderr: %s\n", resp.Stdout, resp.Stderr)
		}
	},
}

func init() {
	rootCmd.AddCommand(runCmd)

	// Here you will define your flags and configuration settings.

	// Cobra supports Persistent Flags which will work for this command
	// and all subcommands, e.g.:
	// runCmd.PersistentFlags().String("foo", "", "A help for foo")

	// Cobra supports local flags which will only run when this command
	// is called directly, e.g.:
	// runCmd.Flags().BoolP("toggle", "t", false, "Help message for toggle")
	runCmd.Flags().StringP("lang", "l", "implicit", "specifies the language for the source file. If not specified, CLI will try to guess language type before making API call.")
}

func extractExtension(filename string) string {
	f := []rune(filename)
	for i := len(f) - 1; i >= 0; i -= 1 {
		if f[i] == '.' {
			return string(f[i+1:])
		}
	}
	return filename
}
