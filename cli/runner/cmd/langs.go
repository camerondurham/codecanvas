/*
Copyright © 2022 NAME HERE <EMAIL ADDRESS>
*/
package cmd

import (
	"fmt"

	"github.com/runner-x/runner-x/cli/runner/client"
	coderunner "github.com/runner-x/runner-x/engine/coderunner/v1"
	"github.com/spf13/cobra"
)

// langsCmd represents the langs command
var langsCmd = &cobra.Command{
	Use:   "langs",
	Short: "query the server for supported languages",
	Run: func(cmd *cobra.Command, args []string) {
		url, err := rootCmd.PersistentFlags().GetString("url")
		if err != nil {
			panic(err)
		}

		var cmdClient client.Requester
		clint := client.Config{
			BaseUrl: url,
			Timeout: coderunner.TIMEOUT_DEFAULT,
		}
		cmdClient = client.NewClientFromConfig(clint)

		resp, err := cmdClient.Languages()
		if err != nil {
			fmt.Println(err)
			return
		}
		fmt.Print("Currently supported languages: ")
		for _, lang := range resp.Languages {
			fmt.Printf("%s ", lang)
		}
	},
}

func init() {
	rootCmd.AddCommand(langsCmd)

	// Here you will define your flags and configuration settings.

	// Cobra supports Persistent Flags which will work for this command
	// and all subcommands, e.g.:
	// langsCmd.PersistentFlags().String("foo", "", "A help for foo")

	// Cobra supports local flags which will only run when this command
	// is called directly, e.g.:
	// langsCmd.Flags().BoolP("toggle", "t", false, "Help message for toggle")
}
