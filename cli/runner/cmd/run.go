/*
Copyright © 2022 NAME HERE <EMAIL ADDRESS>

*/
package cmd

import (
	"github.com/spf13/cobra"
)

// runCmd represents the run command
var runCmd = &cobra.Command{
	Use:   "run",
	Short: "runs the supplied code loaded in from a file.",
	Run: func(cmd *cobra.Command, args []string) {
		//TODO: implement flag logic, implement source file args parsing
		/*
			cmdClient := client.NewClient()

			str, err := cmd.Flags().GetString("lang")
			client.PanicCheck(err)

			argLen := len(args)
			if argLen < 1 {
				fmt.Println("No file specified for compilation; Please specify a file!")
				return
			} else if argLen > 1 {
				fmt.Println("Multiple file compilation not yet supported. Please only specify a single file for compilation.")
				return
			}
			//Need to construct an api.RunRequest here
			//ret, err := cmdClient.Run()
			if err != nil {
				fmt.Println(err)
			} else {
				fmt.Printf("Stdout: %s\nStderr: %s\n", ret.Stdout, ret.Stderr)
			}
		*/
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
