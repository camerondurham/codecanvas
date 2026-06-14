package v2

type LanguageType int

type Language struct {
	Name          string
	FileExtension string
	CompileCmd    []string
	RunCmd        []string
	SandboxImage  string
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

func SandboxImages(imageOverrides map[string]string) []string {
	images := []string{}
	seen := map[string]bool{}

	for _, language := range allLanguages {
		image := language.SandboxImage
		if imageOverrides != nil {
			if override, ok := imageOverrides[language.Name]; ok && len(override) > 0 {
				image = override
			}
		}
		if seen[image] {
			continue
		}
		seen[image] = true
		images = append(images, image)
	}

	return images
}

var (
	Python3 = Language{
		Name:          "python3",
		FileExtension: ".py",
		CompileCmd:    nil,
		RunCmd:        []string{"python3"},
		SandboxImage:  "python:3-slim",
	}
	Shell = Language{
		Name:          "bash",
		FileExtension: ".sh",
		CompileCmd:    nil,
		RunCmd:        []string{"bash"},
		SandboxImage:  "bash:5",
	}
	Cpp = Language{
		Name:          "c++",
		FileExtension: ".cpp",
		CompileCmd:    []string{"g++"},
		RunCmd:        []string{"./a.out"}, // TODO: shouldn't need to hardcode this
		SandboxImage:  "gcc:14-bookworm",
	}
	Go = Language{
		Name:          "go",
		FileExtension: ".go",
		CompileCmd:    []string{"go", "build"},
		RunCmd:        []string{"./run"},
		SandboxImage:  "golang:1-bookworm",
	}
	NodeJs = Language{
		Name:          "nodejs",
		FileExtension: ".js",
		CompileCmd:    nil,
		RunCmd:        []string{"node"},
		SandboxImage:  "node:lts-bookworm-slim",
	}
	Rust = Language{
		Name:          "rust",
		FileExtension: ".rs",
		CompileCmd:    []string{"rustc"},
		RunCmd:        []string{"./run"},
		SandboxImage:  "rust:1-bookworm",
	}

	SupportedLanguages = []string{
		Python3.Name,
		NodeJs.Name,
		Cpp.Name,
		Go.Name,
		Shell.Name,
		Rust.Name,
	}

	SupportedLanguageSet = map[string]bool{
		Python3.Name: true,
		NodeJs.Name:  true,
		Cpp.Name:     true,
		Go.Name:      true,
		Shell.Name:   true,
		Rust.Name:    true,
	}

	allLanguages = []Language{
		Python3,
		Shell,
		Cpp,
		Go,
		NodeJs,
		Rust,
	}

	FileExtensionToLangMap, LangNameToLangMap = createLangMaps(allLanguages)
)
