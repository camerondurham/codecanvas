/*
Copyright © 2022 NAME HERE <EMAIL ADDRESS>

*/
package cmd

import (
	"encoding/json"
	"fmt"
	"io"
	"net/http"

	"github.com/spf13/cobra"
)

const (
	LANG_ENDPOINT = "/api/v1/languages"
)

var (
	server string = "http://localhost:8080"
)

// Simple struct to hold JSON vals from API call
type Langs struct {
	Languages []string `json:"languages"`
}

// langsCmd represents the langs command
var langsCmd = &cobra.Command{
	Use:   "langs",
	Short: "query the server for supported languages",
	Run: func(cmd *cobra.Command, args []string) {
		// implement CLI subcommand logic here

		// later on, I should prob use an HTTP client to craft requests
		//semi-hardcoded url here; any better way to dynamically grab api path?
		resp, err := http.Get(server + LANG_ENDPOINT)
		if err != nil {
			fmt.Println("Bad API call")
			return
		}

		body, err := io.ReadAll(resp.Body)
		//all of these error checks get pretty redundant,
		//maybe there's a way to make this better in the future
		if resp.StatusCode > 299 {
			fmt.Printf("Response failed with status code: %d\n", resp.StatusCode)
			return
		}
		if err != nil {
			fmt.Printf(err.Error())
			return
		}
		var res Langs
		fmt.Print("Currently supported languages: ")
		json.Unmarshal(body, &res)
		for _, lang := range res.Languages {
			fmt.Printf("%s ", lang)
		}
		//fmt.Println("langs called")
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
