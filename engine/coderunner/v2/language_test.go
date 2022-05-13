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
			args: args{langs: SupportedLanguages},
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
