package v2

type LanguageType int

type Language struct {
	Name          string
	FileExtension string
	CompileCmd    []string
	RunCmd        []string
}

func createLangMaps(langs []Language) (map[string]Language, map[string]Language) {
	// TODO: this is a brittle way to define these maps, easy to forget the order
	extToLang := map[string]Language{}
	nameToLang := map[string]Language{}
	for _, v := range langs {
		extToLang[v.FileExtension] = v
		nameToLang[v.Name] = v
	}
	return extToLang, nameToLang
}

var (
	Python3 = Language{
		Name:          "python3",
		FileExtension: ".py",
		CompileCmd:    nil,
		RunCmd:        []string{"python3"},
	}
	Shell = Language{
		Name:          "bash",
		FileExtension: ".sh",
		CompileCmd:    nil,
		RunCmd:        []string{"bash"},
	}
	Cpp11 = Language{
		Name:          "c++11",
		FileExtension: ".cpp",
		CompileCmd:    []string{"g++", "--std=c++11"},
	}
	Go = Language{
		Name:          "go",
		FileExtension: ".go",
		CompileCmd:    []string{"go", "build"},
		RunCmd:        nil,
	}
	NodeJs = Language{
		Name:          "nodejs",
		FileExtension: ".js",
		CompileCmd:    nil,
		RunCmd:        []string{"node"},
	}

	SupportedLanguages = []Language{
		Python3,
		NodeJs,
	}

	allLanguages = []Language{
		Python3,
		Shell,
		Cpp11,
		Go,
		NodeJs,
	}

	FileExtensionToLangMap, LangNameToLangMap = createLangMaps(allLanguages)
)
