package errors

func HandleErrors(err error) {
	if err != nil {
		panic(err)
	}
}
