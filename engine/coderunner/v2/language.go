package v2

type LanguageV2Type int

type LanguageV2 struct {
	Name          string
	FileExtension string
	LanguageV2Type
}

const (
	COMPILED    = LanguageV2Type(1)
	INTERPRETED = LanguageV2Type(2)
)

var (
	Python3LangV2 = LanguageV2{
		Name:           "python3",
		FileExtension:  ".py",
		LanguageV2Type: INTERPRETED,
	}
	ShellLangV2 = LanguageV2{
		Name:           "bash",
		FileExtension:  ".sh",
		LanguageV2Type: INTERPRETED,
	}
	Cpp11LangV2 = LanguageV2{
		Name:           "c++11",
		FileExtension:  ".cpp",
		LanguageV2Type: COMPILED,
	}
	NodeJsLangV2 = LanguageV2{
		Name:           "nodejs",
		FileExtension:  ".js",
		LanguageV2Type: INTERPRETED,
	}

	LanguagesV2 = []LanguageV2{
		Python3LangV2,
		NodeJsLangV2,
	}
)
