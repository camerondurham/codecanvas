package writerremover

import (
	"fmt"
	"github.com/runner-x/runner-x/util/files"
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
	defer files.RemovePath(dir)

	tests := []struct {
		name    string
		fields  fields
		args    args
		wantErr bool
	}{
		{
			name: "Nil Blob Shouldn't Panic",
			fields: fields{
				Workdir: "",
				Perm:    0666,
			},
			args:    args{blob: nil},
			wantErr: false,
		},
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
		{
			name: "Simple Write Bigger FIle",
			fields: fields{
				Workdir: "",
				Perm:    0666,
			},
			args: args{blob: &Blob{
				data:     []byte("#!/bin/bash\n\necho hello world\n\nsleep 2"),
				filename: "test.sh",
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
			if tt.args.blob != nil {
				if len(ww.written) != 1 {
					t.Errorf("Write() expected to add filename to ww.written")
				}
				for _, f := range ww.written {
					fi, err := os.Stat(f)
					if err != nil {
						t.Errorf("error reading written file: %v", err)
					}
					if len(tt.args.blob.data) > 0 && fi.Size() <= 0 {
						t.Errorf("Write() did not actually write any file. Expected size: %v, got: %v", len(tt.args.blob.data), fi.Size())
					}
				}
				err = os.RemoveAll(filepath.Join(tt.fields.Workdir, tt.args.blob.filename))
			}
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
		{
			name: "Remove Non Existent Path Test",
			fields: fields{
				workdir: "/tmp",
				perm:    0644,
				written: []string{"/bad/path"},
			},
			// if path does not exist, it will not throw any error
			// RemoveAll only throws error PathError if there is (I think) bad permissions or symlink??
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
				if f != "/bad/path" {
					err := ww.Write(&Blob{
						data:     []byte("blob"),
						filename: f,
					})
					HandleTestErr(err)
				}
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
