package controller

import (
	"fmt"
	"os"
	"path/filepath"
	"reflect"
	"testing"
)

func TestWorkdirWriter_Write(t *testing.T) {
	type fields struct {
		Workdir string
		Perm    os.FileMode
	}
	type args struct {
		blob *Blob
	}

	dir, err := os.MkdirTemp("/tmp", "TestWorkdirWriter_Write")
	HandleTestErr(err)
	defer func(path string) {
		err := os.RemoveAll(path)
		HandleTestErr(err)
	}(dir)

	tests := []struct {
		name    string
		fields  fields
		args    args
		wantErr bool
	}{
		{
			name: "Simple Write Nothing",
			fields: fields{
				Workdir: "",
				Perm:    0666,
			},
			args: args{blob: &Blob{
				data:     []byte(""),
				filename: "empty.txt",
			}},
			wantErr: false,
		},
		{
			name: "Simple Write Something",
			fields: fields{
				Workdir: "",
				Perm:    0666,
			},
			args: args{blob: &Blob{
				data:     []byte("hello cruel world"),
				filename: "nonempty.txt",
			}},
			wantErr: false,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			ww := &WorkdirWriter{
				workdir: tt.fields.Workdir,
				perm:    tt.fields.Perm,
			}
			if err := ww.Write(tt.args.blob); (err != nil) != tt.wantErr {
				t.Errorf("Write() error = %v, wantErr %v", err, tt.wantErr)
			}
			if len(ww.written) != 1 {
				t.Errorf("Write() expected to add filename to ww.written")
			}
			err = os.RemoveAll(filepath.Join(tt.fields.Workdir, tt.args.blob.filename))
		})
	}
}

func HandleTestErr(err error) {
	if err != nil {
		fmt.Printf("error in test: %v", err)
		panic(err)
	}
}

func TestWorkdirWriter_Remove(t *testing.T) {
	type fields struct {
		workdir string
		perm    os.FileMode
		written []string
	}
	tests := []struct {
		name    string
		fields  fields
		wantErr bool
	}{
		{
			name: "Simple Remove None Test",
			fields: fields{
				workdir: "/tmp",
				perm:    0644,
				written: []string{},
			},
			wantErr: false,
		},
		{
			name: "Simple Remove One Test",
			fields: fields{
				workdir: "/tmp",
				perm:    0644,
				written: []string{"one"},
			},
			wantErr: false,
		},
		{
			name: "Simple Remove Two Test",
			fields: fields{
				workdir: "/tmp",
				perm:    0644,
				written: []string{"one", "two"},
			},
			wantErr: false,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			ww := &WorkdirWriter{
				workdir: tt.fields.workdir,
				perm:    tt.fields.perm,
				written: tt.fields.written,
			}
			for _, f := range tt.fields.written {
				err := ww.Write(&Blob{
					data:     []byte("blob"),
					filename: f,
				})
				HandleTestErr(err)
			}
			if err := ww.Remove(); (err != nil) != tt.wantErr {
				t.Errorf("Remove() error = %v, wantErr %v", err, tt.wantErr)
			}
			if len(ww.written) != 0 {
				t.Errorf("Expected len(written) == 0, got %v", len(ww.written))
			}
		})
	}
}

func TestNewWorkdirWriter(t *testing.T) {
	type args struct {
		workdir string
		perm    os.FileMode
		written []string
	}
	tests := []struct {
		name string
		args args
		want *WorkdirWriter
	}{
		{
			name: "Simple Create Workdir Writer",
			args: args{
				workdir: "/tmp",
				perm:    0644,
			},
			want: &WorkdirWriter{workdir: "/tmp", perm: 0644, written: []string{}},
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			if got := NewWorkdirWriter(tt.args.workdir, tt.args.perm); !reflect.DeepEqual(got, tt.want) {
				t.Errorf("NewWorkdirWriter() = %v, want %v", got, tt.want)
			}
		})
	}
}
