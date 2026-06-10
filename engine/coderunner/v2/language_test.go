package v2

import (
	"reflect"
	"testing"
)

func Test_createLangMaps(t *testing.T) {
	type args struct {
		langs []Language
	}
	tests := []struct {
		name                  string
		args                  args
		wantExtToLangMap      map[string]Language
		wantLangNameToLangMap map[string]Language
	}{
		{
			name: "Test Map Is Created",
			args: args{langs: []Language{Python3, NodeJs}},
			wantExtToLangMap: map[string]Language{
				".py": Python3,
				".js": NodeJs,
			},
			wantLangNameToLangMap: map[string]Language{
				"python3": Python3,
				"nodejs":  NodeJs,
			},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			got, got1 := createLangMaps(tt.args.langs)
			if !reflect.DeepEqual(got, tt.wantExtToLangMap) {
				t.Errorf("createLangMaps() got = %v, wantExtToLangMap %v", got, tt.wantExtToLangMap)
			}
			if !reflect.DeepEqual(got1, tt.wantLangNameToLangMap) {
				t.Errorf("createLangMaps() got1 = %v, wantExtToLangMap %v", got1, tt.wantLangNameToLangMap)
			}
		})
	}
}

func TestSandboxImages(t *testing.T) {
	got := SandboxImages(map[string]string{
		Python3.Name: "codecanvas-sandbox:local",
		NodeJs.Name:  "codecanvas-sandbox:local",
	})

	if len(got) != len(allLanguages)-1 {
		t.Fatalf("SandboxImages() = %v, want deduped override", got)
	}
	if got[0] != "codecanvas-sandbox:local" {
		t.Fatalf("SandboxImages()[0] = %q, want override", got[0])
	}
}
